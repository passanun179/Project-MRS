<template>
  <header>
    <h1>ระบบจัดการข้อมูลผู้ป่วย</h1>
  </header>
      <section class="patient-content">
        <h2>ข้อมูลผู้ป่วย</h2>
        <ListPatient/>
      </section>
</template>

<script>
import ListPatient from './components/ListPatient.vue'
export default {
  name: 'App',
  components: {
    ListPatient
  }  
}
</script>

<style>
*{
  box-sizing:border-box;
}
body{
  margin:0;
}
header{
  box-shadow: 0 2px 8px rgba(0,0,0,0.26);
  margin:3rem;
  border-radius: 10px;
  padding: 1rem;
  background-color: blueviolet;
  color: burlywood;
  text-align: center;
}
.patient-content{
  box-shadow: 0 2px 8px rgba(0,0,0,0.26);
  margin:3rem;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}
.patient-content h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: blue;
  margin: 0 0 1 rem 0;
}
</style>
