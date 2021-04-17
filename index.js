var fastTag={"TN AB C 1234":
{owner_name:"Jake",
vehicle_type:"car",
last_travelled_time:"",
}}

const types={"car":85.00,"jeep":85.00,"van":85.00,"lcv":135.00,"bus":285.00,"truck":285.00,"hcm":450.00,"eme":450.00,"3axle":315.00,"6axle":450.00,"7axle":550}
const registration_fee=50.00

function getVehicleNumber(){
    var vehicle_number=prompt("Enter Vehicle Number");
    actions(vehicle_number);
}
getVehicleNumber();


function register(vehicle_number,owner_name,vehicle_type){

    let last_travelled_time=Date.now();
    let bill=(registration_fee+getBill(vehicle_type)).toFixed(2);
    fastTag[vehicle_number]={owner_name,vehicle_type,last_travelled_time};
    alert("TotalBill: "+bill);
    getVehicleNumber();

}

function validateVehicleType(vehicle_type){

    var valid_vehicle_type=true;
    if(vehicle_type.search("axle")>=0)
    {
        let axle_number=parseInt(vehicle_type);
        if(axle_number>=1 && axle_number<=3)
        {
            vehicle_type="3axle"
        }
        else if(axle_number>=4 && axle_number<=6)
        {
            vehicle_type="6axle"
        }
        else if(axle_number>=7){
            vehicle_type="7axle"
        }
    }

    if(!types[vehicle_type])
    {   
        valid_vehicle_type=false;
    }
    return valid_vehicle_type;
}

function getBill(vehicle_type){

    let bill=0;
    if(vehicle_type.search("axle")>=0)
    {
        let axle_number=parseInt(vehicle_type);
        if(axle_number>=1 && axle_number<=3)
        {
            bill=types["3axle"];
        }
        else if(axle_number>=4 && axle_number<=6)
        {
            bill=types["6axle"];
        }
        else{
            bill=types["7axle"];
        }
    }
    else{
        bill=types[vehicle_type];
    }
    return bill;
}

function actions(vehicle_number)
{
    if(vehicle_number)
    {
            if(!fastTag[vehicle_number])
            {
            let choose=prompt("Vehicle number you entered does not have fast tag"+"\n"+
            "Choose 1 to Register for fast tag"+"\n"+
            "Choose 2 to Exit"+"\n"+"Enter Your Option")

            switch(choose){
                case "1":
                    let owner_name=prompt("Enter Owner Name")
                    let vehicle_type=prompt("Enter Vehicle type")
                    if(!owner_name || !vehicle_type)
                    {
                        alert("invalid input");
                    }
                    var valid_vehicle_type=validateVehicleType(vehicle_type);
                    if(valid_vehicle_type)
                    {
                        register(vehicle_number,owner_name,vehicle_type)
                    }
                    else{
                        alert("Invalid vehice type")
                        actions(vehicle_number);
                    }
                    break;
                case "2":
                    break;
            }
        }
        else{
            let current_time=Date.now()
            let last_travelled_time=fastTag[vehicle_number].last_travelled_time
            let bill=0;//1800000
            if((current_time-last_travelled_time>60000) || (!last_travelled_time)){
                fastTag[vehicle_number].last_travelled_time=current_time;
                bill=getBill(fastTag[vehicle_number].vehicle_type).toFixed(2);
            }
            else{
                bill=(getBill(fastTag[vehicle_number].vehicle_type)/2).toFixed(2);
                fastTag[vehicle_number].last_travelled_time="";
            }
            alert("Bill:"+bill);
            getVehicleNumber();
        }

    }
    else{
        alert("Vehice number is inavlid")
    }
}

