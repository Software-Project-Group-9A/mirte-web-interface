<template>
    <div class="tutorial_window rounded" >

        <button class="btn btn-primary btn-sm" @click="close">
            <i class="fa fa-times-circle"></i>
        </button>

        <div class="tutorial_control float-right">
            <button class="btn btn-primary btn-sm" @click="prev">
                <i class="fa fa-arrow-circle-left"></i>
            </button>
            <button class="btn btn-primary btn-sm" @click="next">
                <i class="fa fa-arrow-circle-right"></i>
            </button>
        </div>

        <div class="tutorial_slide_indicator float-right mr-3">
            slide {{step+1}}/{{length}}
        </div>

        <div class="tutorial_media">
            <img v-if="type == 'image'" :src="media">
            <video v-if="type == 'video'" width="800" height="600" controls>
                <source :src="media" type="video/mp4">
            </video> 
        </div>

        <div class="tutorial_text">
            {{text}}
        </div>

    </div>
</template>

<script>

export default {
    data(){
        return {
            step: 0
        }
    },
    props: {
        tutorial: {}
    },
    computed:{
        type(){
            if(!this.media) return 'text'
            return ['jpg', 'jpeg', 'webp', 'png', 'bmp'].includes(this.media.split('.')[1]) ? 'image' : 'video'
        },
        media(){
            return this.tutorial.steps[this.step].media
        },
        text(){
            return this.tutorial.steps[this.step].text
        },
        length(){
            return Object.entries(this.tutorial.steps).length
        }
    },
    methods: {
        next(){
            if(this.length -1 > this.step)
                this.step++
        },
        prev(){
            if(this.step > 0)
                this.step--
        },
        close(){
            this.$store.dispatch('setTutorial', null)
        }
    }
}
</script>