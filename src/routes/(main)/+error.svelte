<script lang="ts">
    import { page } from "$app/stores";
    export let status = $page.status;
    export let error = $page.error;
</script>

{status}
<br />
{error}
