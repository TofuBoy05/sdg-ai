<script>
  import "../app.css";
  let aboutModal;
</script>



<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl">SDG AI</a>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost" on:click={aboutModal.checked = true}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
</div>

<slot />


<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-4" class="modal-toggle" bind:this={aboutModal}/>
<label for="my-modal-4" class="modal cursor-pointer">
    
  <label class="modal-box relative" for="">
    <label for="my-modal-4" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="text-lg font-bold">About SDG AI</h3>
    <p class="py-4">Our website is dedicated to promoting Sustainable Development Goal 16, which aims to create peaceful, inclusive, and just societies. With the help of Artificial Intelligence, we aspire to provide a platform where people can access information, resources, and opportunities related to SDG 16. Our website is designed to be a central hub of information that can serve as a valuable resource for anyone interested in learning more about this goal and taking steps towards its realization.<br><br> We believe that addressing the issues related to SDG 16 is crucial for creating a sustainable and equitable future, and we are committed to raising awareness among our peers, teachers, and the community about the importance of this goal. We hope that our website will inspire and encourage everyone to take action towards building a better world.<br><br>Visit <a href="https://charlzfelipe.eu.org" class="underline" target="_blank">charlzfelipe.eu.org</a> to see more of Charlz Felipe's projects.</p>
  </label>
</label>