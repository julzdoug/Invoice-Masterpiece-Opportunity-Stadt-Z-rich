<template>
     <Header /> 

     <section class="content ms-3 me-3">
<Hero  />
  <button class="btn button-section-jumper btn-lg" >
    
  </button>

<Image  />
<!-- <editInvoice v-if="user" /> -->
  <button class="btn button-section-jumper btn-lg">

  </button>
  
<Discription  />
<!-- <editInvoice v-if="user" /> -->
  <button class="btn button-section-jumper btn-lg">

  </button>

<div id="form" class="fit bg-primary bg-opacity-25 ms-3 me-3">
  <InvoiceForm />

  <!--   <Login v-if="!user" @login-success="handleLoginSuccess" /> -->
</div>
  <div class="scroll-back-to-top" @click="scrollToTop"  ref="scrollButton">
    <button class="btn btn-primary btn-lg"><i class="bi bi-file-arrow-up-fill"></i></button>
  </div>
  </section>
  <Footer class="content" />
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Header from "./Header.vue";
import Hero from "./heroSection.vue";
import Discription from "./discription.vue";
import Footer from "./footer.vue";
import InvoiceForm from './InvoiceForm.vue';
import Image from "./imageHero.vue";

export default {
  components: {
    Header,
    Hero,
    Discription,
    Footer,
    InvoiceForm,
    Image,
  },
  methods: {
    scrollToTop() {
      const scrollButton = this.$refs.scrollButton;

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      const handleScroll = () => {
        if (scrollButton) {
          if (window.scrollY > 10) {
            scrollButton.style.display = 'none';
          } else {
            scrollButton.style.display = 'block';
          }
        }
      };

      const handleScrollEnd = () => {
        if (scrollButton) {
          if (window.scrollY === 0) {
            scrollButton.style.display = 'none';
          } else {
            scrollButton.style.display = 'block';
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('scroll', handleScrollEnd);

      onMounted(() => {
        handleScroll();
        handleScrollEnd();
        
      });

      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scroll', handleScrollEnd);
      });
    },
  },
};
</script>




<style scoped>
#app {
  height: 100vh;
}
.fit {
  height:auto;
}
.scroll-back-to-top {
  position: fixed;
  bottom: 100px;
  right: 20px;
}
.scroll-back-to-top button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.content {
  border-top: 1px solid #ccc; /* You can adjust the border style and color */
  padding-top: 20vh; 
}

</style>
