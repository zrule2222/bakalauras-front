
<template>
    <section class="hero is-link is-fullheight has-background-info">
        <div class="hero-body">
            <div>
                <p class="title text-left">
                    401 Puslapis
                </p>
                <p class="subtitle w-fit ">
                    Jūs neturite teisės patekti į norimą puslapį
                </p>
                <button @click="$router.go(-1)" class="button is-success float-left">Grįžti į praeitą puslapį</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Page401',
}
</script>