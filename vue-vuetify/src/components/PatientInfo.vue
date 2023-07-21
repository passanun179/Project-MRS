<template>
    <li>
        <h1> ชื่อ : {{name}} </h1>
        <botton @click="showDescription(id)">รายละเอียด</botton> &nbsp;
        <botton>ลบข้อมูล</botton>
        <div v-show="isVisible">
            <p>เลขบัตรประชาชน : {{ idcardnumber }}</p>
            <p>อายุ : {{ age }}</p>
            <p>เพศ : {{ gender }}</p>
            <p>เบอร์โทรศัพท์ : {{ phone }}</p>
        </div>
    </li>
</template>

<script>
export default{
    name: "PatientInfo",
    props:{
        id:{
            type:Number
        },
        name:{
            type: String,
            required: true
        },
        idcardnumber: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: ['female', 'male']
        },
        phone:{
            type: String,
            required: true
        },
        isVisible:{
            type: Boolean
        }
    },
    methods: {
        showDescription(id){
            this.$emit("show", id);
        }
    }

}
</script >

<style scoped>
li{
    margin: 1rem 0;
    font-size: 1.25rem;
    font-weight: bold;
    background: #d67d7d;
    padding: 0.5rem;
    color:rgb(0, 0, 0);
    border-radius: 25px;
}
botton{
    font:inherit;
    cursor:pointer;
    border: 1px solid #3c9e6d;
    background: #3c9e6d;
    color: white;
    padding: 0.05rem 1rem;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26)
}
</style>