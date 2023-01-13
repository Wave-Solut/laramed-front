<template>
    <div class="py-4 container-fluid" >
      <div class="row">
        <div class="col-lg-5 mx-3">
          <h4 class="text-white"> New Country </h4>
           
        </div>
        <div
          class="text-right col-lg-6 d-flex flex-column justify-content-center ">
          
        </div>
      </div>
      <div class=" row mt-8">
   
        <div class="mt-4 col-lg-12 mt-lg-0 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="font-weight-bolder">Country</h5>
              <div class="row">
                <span class="  text-xs mb-4" :class="isError ? 'text-danger' : 'text-success'">{{errMessage}} </span>
                <div class="col-12 col-sm-6">
                  <label>Country Name</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="vcountry.name"
                     
                  />
                </div>
                <div class="col-12 col-sm-6">
                    <label>Country Code</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="vcountry.code"
                       
                    />
                  </div>
                
              </div>
             
            </div>
          </div>
        </div>

        <div class="col-lg-12">
           
            <div class="card ">
              <div class="card-body">
                <div class="row">
                  
                  <div class=" row">
                     
                        <div class="col-lg-12">
                            <div class="d-flex justify-content-end ">
                                  <button
                                      class="mb-0 btn bg-gradient-success btn-sm me-2"
                                      type="button"
                                      name="button"
                                      @click="saveCountry"
                                    >
                                      Save
                                  </button>
                                   
                                
                                    
                            </div>
                           
                        </div>
                     
                    
                  </div>
                 
                </div>
    
              </div>
            </div>
          </div>

      </div>
      
    </div>
  </template>
  
  <script>
    import axios from 'axios';

  export default {
    name: "AddCountry",

    data() {
      return {
        
        config: {
          allowInput: true,
        },
        vcountry:{
            name:'',
            code:'',
          },
        isResult:false,
        isError: false,
        errMessage:'',
        
      };
    },
    methods: {
    
        saveCountry(){

            axios.post('/country', this.vcountry ).then(({data}) => {
                console.log( data.message);
                this.errMessage =  data.message;
                this.vcountry.name = data.country.name;
                this.vcountry.code = data.country.code;
                this.isResult = true
            }).catch(({data}) => {
                this.errMessage =  data.message;
                this.isError = true; 
                this.isResult = true
            }).finally(()=>{
                 //alert("form created");
             });
        },
    },
   
  };
  </script>
  