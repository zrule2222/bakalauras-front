
<template>
    <section class="hero is-link is-fullheight has-background-danger">
        <div class="hero-body">
            <div>
                <p class="title">
                    404 Puslapis
                </p>
                <p class="subtitle mr-5">
                    Puslapis nerastas
                </p>
                <button @click="$router.go(-1)" class="button is-success ">Grįžti į praeitą puslapį</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Page404',
}
</script>