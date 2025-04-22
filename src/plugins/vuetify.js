import vue from 'vue'
import vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css';
import * as VuetifyComponents from 'vuetify/lib/components';
import * as VuetifyDirectives from 'vuetify/lib/directives';

vue.use(vuetify , {
    components: VuetifyComponents ,
    directives: VuetifyDirectives, 
})


export default new vuetify({
    icons: {
        iconfont: 'md', // 👈 Use Material Design Icons
    },
    theme: {
        dark: false,
        light: {
            buttonConfiramationColor :'',
            buttonCancelColor : '' ,
            backgroundColor : '#BC8A5F' ,
        }, // Change to true if you want dark mode
      }
})