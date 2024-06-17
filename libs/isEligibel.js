module.exports = isEligibel = ({hasChronic, lastDonation, age, healty, systolic, diastolic,temperature,pulse,weight, hemoglobin}) => {
    return (
        !hasChronic && 
        (lastDonation === null || new Date(lastDonation) < new Date(new Date().setMonth(new Date().getMonth() - 3))) &&
        age >= 17 &&
        age <= 60 &&
        healty &&
        systolic >= 100 &&      
        systolic <= 150 &&
        diastolic >= 70 &&
        diastolic <= 80 &&
        temperature >= 36.6 &&
        temperature <= 37.5 &&
        pulse >= 50 &&
        pulse <= 100 &&
        weight >= 45 &&         
        hemoglobin >= 12.5 &&
        hemoglobin <= 17.0
    )
}