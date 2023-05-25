<script>

	import ChatMessage from "$lib/ChatMessage.svelte";
    import { SSE } from 'sse.js'
    import { afterUpdate } from 'svelte';
    import Icon from '@iconify/svelte';

    let inputValue = ''
    let answer = ''
    let loading;
    let messageContainer;
    let bottom;
    let generating = false;
    let deleteModal;
    let inputArea;

    let messagesList = []

    async function submitHandler() {
        
        setTimeout(() => {
            bottom.scrollIntoView();
        }, 10)
        
        if (inputValue == ''){
            return
        }
        
        messagesList.push({role: 'user', content: inputValue})
        inputValue = ''
        messagesList = messagesList
        generating = true
        
        const eventSource = new SSE('/api/chat', {
            headers: {
                'Application-Type': 'application/json'
            },
            payload: JSON.stringify({messages: messagesList})
        })

        eventSource.addEventListener('error', handleError)
        eventSource.addEventListener('message', (e) => {
            try {
                generating = true
                // console.log(e.data)
                loading = false
                if (e.data === '[DONE]'){
                    bottom.scrollIntoView({ behavior: 'smooth' });
                    messagesList = [...messagesList, { role: 'assistant', content: answer}]
                    answer = ''
                    generating = false
                    inputArea.focus()
                    return
                }

                const completionResponse = JSON.parse(e.data)
                const [{delta}] = completionResponse.choices
                if (delta.content) {
                    if (delta.content.includes('@') || delta.content.includes('SYSTEM')){
                        delta.content = '███'
                    }
                    if (delta.content.includes('/n')){
                        delta.content = '<br>'
                    }
					answer += delta.content
                    bottom.scrollIntoView({ behavior: 'smooth' });
				}
            } catch (err) {
                handleError(err)
            }
        })

        eventSource.stream()
        
    }

    function handleError(err){
        loading = false;
        inputValue = ''
        answer = ''
        generating = false
        inputArea.focus()
        console.error(err)
    } 


</script>

<div class="grid place-items-center">

    <div class="w-[100%] md:w-[40rem] px-5 pb-[10rem]" bind:this={messageContainer}>

        {#each messagesList as message}
            <ChatMessage user={message.role} content={message.content} />
        {/each}
        {#if answer}
        <ChatMessage user='assistant' content={answer} />
        {/if}
        <div bind:this={bottom}></div>
        {#if messagesList.length == 0}
            <div class="p-5">
                <p class="text-white text-4xl font-bold text-center mb-5 mt-12">SDG16 AI</p>
                <p class="text-center my-5">Don't know what to ask?</p>
                <div class="columns-1 md:columns-2 gap-2">
                    <button class="w-[100%]"  on:click={() => {inputValue = "What is this website about?"; submitHandler() }}><div class="bg-[#212630] hover:bg-[#181c24] transition-all p-4 rounded-xl mb-2 text-center">What is this website about?</div></button>
                    <button class="w-[100%]"  on:click={() => {inputValue = "Who are the proponents of this project?"; submitHandler() }}><div class="bg-[#212630] hover:bg-[#181c24] transition-all p-4 rounded-xl mb-2 text-center">Who are the proponents of this project?</div></button>
                    <button class="w-[100%]" on:click={() => {inputValue = "How can we apply this to our school?"; submitHandler() }}><div class="bg-[#212630] hover:bg-[#181c24] transition-all p-4 rounded-xl mb-2 text-center">How can we apply this to our school?</div></button>
                    <button class="w-[100%]" on:click={() => {inputValue = "How do we help promote this campaign?"; submitHandler() }}><div class="bg-[#212630] hover:bg-[#181c24] transition-all p-4 rounded-xl mb-2 text-center">How do we help promote this campaign?</div></button>
                    <button class="w-[100%]" on:click={() => {inputValue = "What is an AI?"; submitHandler() }}><div class="bg-[#212630] hover:bg-[#181c24] transition-all p-4 rounded-xl mb-2 text-center">What is an AI?</div></button>
                    <button class="w-[100%]" on:click={() => {inputValue = "What is SDG 16?"; submitHandler() }}><div class="bg-[#212630] hover:bg-[#181c24] transition-all p-4 rounded-xl mb-2 text-center">What is SDG 16?</div></button>
                </div>
            </div>
        {/if}


        
    </div>
    <form class="fixed bottom-0 mb-5 px-5 w-[100%] md:w-[40rem] flex" on:submit|preventDefault={submitHandler}>
            <button type="button" class="btn btn-square mr-2 p-0 text-3xl text-white" on:click={() => deleteModal.checked = true}><Icon icon="ph:trash-fill" class="translate-y-[2px]"/></button>
            <input type="text" placeholder="Type here" class="input input-bordered input-primary w-[100%]" bind:value={inputValue} disabled={generating} bind:this={inputArea} />
            <button class="btn ml-2 btn-primary" type="submit">Send</button>
    </form>

    

</div>

<!-- The button to open modal -->

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-6" class="modal-toggle" bind:this={deleteModal}/>
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Alert</h3>
    <p class="py-4">Are you sure you want to clear your chat history?</p>
    <div class="modal-action">
      <button type="button" class="btn outline-none" on:click={() => {deleteModal.checked = false;}}>Cancel</button>
      <button type="button" class="btn btn-ghost bg-red-500 text-white hover:bg-red-800 outline-none" on:click={() => {deleteModal.checked = false; messagesList = []; generating = false}}>Yes</button>
    </div>
  </div>
</div>

