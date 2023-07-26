<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Patients</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="model.data.name" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="text" id="email" v-model="model.data.email" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="id_card">ID Card Number</label>
                    <input type="text" id="id_card" maxlength="13" v-model="model.data.idcardnumber" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="gender">Gender</label>
                    <input type="text" id="gender" v-model="model.data.gender" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="address">Address</label>
                    <input type="text" id="address" v-model="model.data.address" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="phone">Phone</label>
                    <input type="text" id="phone" v-model="model.data.phone" class="form-control"/>
                </div>
                <div>
                    <label for="birthdate">Birthdate:</label>
                    <VueDatePicker id="birthdate" v-model="model.data.birthdate"></VueDatePicker>
                </div>
                <div class="mb-3">
                    <button type="button" @click="updatePatient" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'patientEdit',
    data () {
        return {
            model: {
                patientId:'',
                data: {
                    name: '',
                    email: '',
                    idcardnumber: '',
                    gender: '',
                    address: '',
                    phone: '',
                    birthdate: ''
                }
            }
        }
    },
    mounted() {
        this.patientId = this.$route.params.id;
        this.getPatientData(this.$route.params.id);
    },
    methods: {
        async getPatientData (patientId) {
            try{
                const res = await axios.get(`http://localhost:8080/api/patient/${patientId}`)
                const data = res.data.data;
                delete data._id
                // delete data.updateAt
                // delete data.__v
                // this.model.data = data
                this.model.data.name = data.name;
                this.model.data.email = data.email;
                this.model.data.address = data.address
                this.model.data.gender = data.gender
                this.model.data.idcardnumber = data.idcardnumber
                this.model.data.phone = data.phone
                this.model.data.birthdate = data.birthdate
            }
            catch (error) {
                console.log(error.message)
            }
        },
        async updatePatient(){
            try {
                const res = await axios.put(`http://localhost:8080/api/patient/${this.patientId}`, this.model.data);
                if(res.status == 200){
                    // this.$router.reload();
                this.$router.push('/patients');

                }else{
                    return alert("fail to update patient")
                }            }
            catch (error) {
                console.log(error.message)
            }
        },
        // resetForm() {
        //     this.model.patient = {
        //         name: '',
        //         email: '',
        //         idcardnumber: '',
        //         gender: '',
        //         address: '',
        //         phone: '',
        //         birthdate: ''
        //     };
        // }
    }
}
</script>