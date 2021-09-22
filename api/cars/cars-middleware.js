const carsDb = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  carsDb
    .getById(id)
    .then((car) => {
      if (!car) {
        res.status(404).json({ message: `car with id ${id} is not found` });
      } else {
        req.car = car;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Coul not retrieve id" });
    });
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  if (!vin || !make || !model || !mileage) {
    res.status(400).json({
      message: `${!make && 'make'} is missing`
    });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  const isVinValid = vinValidator.validate(vin);

  if (!isVinValid) {
    res.status(400).json({ message: `Vin ${vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  carsDb
    .getAll()
    .then((cars) => {
      const carVin = cars.find((car) => car.vin === vin); // {}
      if (carVin) {
        res.status(400).message({ message: `Vin ${vin} already exists` });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not retrieve cars to check vin" });
    });
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
