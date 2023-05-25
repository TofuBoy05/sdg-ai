<script>
    export let user;
    export let content;
</script>


{#if user == 'user'}
<div class="chat chat-end">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img src="user.jpg" />
    </div>
  </div>
  <div class="chat-header">
    You
  </div>
  <div class="chat-bubble chat-bubble-primary">{content}</div>
</div>
{/if}

{#if user == 'assistant'}
<div class="chat chat-start">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img src="aicon.jpg" />
    </div>
  </div>
  <div class="chat-header">
    SDG AI
  </div>
  <div class="chat-bubble">{@html content}</div>
</div>
{/if}

