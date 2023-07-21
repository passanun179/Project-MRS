<template>
  <ul>
    <PatientInfo 
      v-for="(item) in patients"
      :id="item.id"
      :key="item.id"
      :name="item.name"
      :idcardnumber="item.idcardnumber"
      :age="item.age"
      :gender="item.gender"
      :phone="item.phone"
      :isVisible="item.isVisible"
      @show="toggleVisible"
    />  
  </ul>
</template>

<script>
import PatientInfo from './PatientInfo.vue'
export default{
    name: 'ListPatient',
    components: {
        PatientInfo
    },
    data () {
    return {
      patients: [
        { 
          id: 1,
          name: "kong Ruksiam",
          idcardnumber: "1104300395915",
          age: 20,
          gender: "male",
          phone: "0987654321",
          isVisible: false
        },
        {
          id: 2,
          name: "jojo kabuki",
          idcardnumber: "1111111111111",
          age: 18,
          gender: "male",
          phone: "0895246016",
          isVisible: false
        },
        {
          id: 3,
          name: "sunny haohao",
          idcardnumber: "1111111100000",
          age: 52,
          gender: "female",
          phone: "0818898188",
          isVisible: false
        }
      ]
    }
  },
  methods: {
      toggleVisible(id) {
        this.patients = this.patients.map((item) => {
          if(item.id === id) {
            return {...item,isVisible:!item.isVisible}
          }
          return item
        })
      }
    }
}
</script>

<style scoped>
ul{
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
</style>