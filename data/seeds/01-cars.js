// STRETCH
exports.seed = (knex) => {
return knex('cars').truncate()
.then(()=> {
    return knex('cars').insert([
        {
          vin: '3476386ABFHFJCK',
          make: 'Toyota',
          model: 'CMRY',
          mileage: 123,
          title: 'New toyota camry',
          transmission: 'Auto'  
        },
        {
            vin: 'ABDFG376376AHDFG',
            make: 'HONDA',
            model: 'CIVIC',
            mileage: 5443,
            title: 'New Honda',
            transmission: 'Manual'  
          }
    
    ])
})
}