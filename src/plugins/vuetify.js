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
        options: {
            customProperties: true, // Required for CSS variable access
        },
        themes: {
            light: {
                  primary: '#D4A276',
                  subPrimary : '#D4A276' ,
                  textColor : '#000000',
                  BackgroundTextColor : '#ffffff',
                  ConfiramationButtonColor :'#90C67C',
                  CancelButtonColor : '#ef233c' ,
                  secondary: '#424242',
                  accent: '#82B1FF',
                  error: '#FF5252',
                  info: '#2196F3',
                  success: '#4CAF50',
                  warning: '#FFC107',
            },

            dark: {
              primary: '#D4A276',
              subPrimary : '#D4A276' ,
              textColor : '#ffffff',
              BackgroundTextColor : '#000000',
              ConfiramationButtonColor :'#90C67C',
              CancelButtonColor : '#ef233c' ,
              secondary: '#424242',
              accent: '#82B1FF',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
            }, 
        },

        light : true ,
        dark : false ,
      },




})