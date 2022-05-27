/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */

export class World {
  constructor() {
    this.household = [];
    this.powerPlant = [];
  }

  createPowerPlant() {
    this.powerPlant.push({
      id: this.powerPlant.length,
      isAlive: true,
    });
    return this.powerPlant.length - 1;
  }

  createHousehold() {
    this.household.push({
      id: this.household.length,
      connectedPowerPlants: [],
      connectedHouseholds: [],
    });
    return this.household.length - 1;
  }

  connectHouseholdToPowerPlant(householdId, powerPlantId) {
    if (
      !this.household[householdId].connectedPowerPlants.includes(powerPlantId)
    ) {
      this.household[householdId].connectedPowerPlants.push(powerPlantId);
    }
  }

  connectHouseholdToHousehold(household1, household2) {
    if (!this.household[household1].connectedHouseholds.includes(household2)) {
      this.household[household1].connectedHouseholds.push(household2);
      this.household[household2].connectedHouseholds.push(household1);
    }
  }

  disconnectHouseholdFromPowerPlant(householdId, powerPlantId) {
    if (
      this.household[householdId].connectedPowerPlants.includes(powerPlantId)
    ) {
      const indexOfPowerPlant =
        this.household[householdId].connectedPowerPlants.indexOf(powerPlantId);
      this.household[householdId].connectedPowerPlants.splice(
        indexOfPowerPlant,
        1
      );
    }
  }

  killPowerPlant(powerPlantId) {
    this.powerPlant[powerPlantId].isAlive = false;
  }

  repairPowerPlant(powerPlantId) {
    this.powerPlant[powerPlantId].isAlive = true;
  }

  householdHasEletricity(householdId, previousIds = []) {
    //not forEach or smth like this, because of i can't use return with this method
    for(let i = 0; i < this.household[householdId].connectedPowerPlants.length; i++){
      const el = this.household[householdId].connectedPowerPlants[i];
      if (this.powerPlant[el].isAlive){
        return true;
      }
    }
    for(let i = 0; i < this.household[householdId].connectedHouseholds.length; i++){
      const el = this.household[householdId].connectedHouseholds[i];
      previousIds.push(householdId);
      if (!previousIds.includes(el)){
        if (this.householdHasEletricity(el,previousIds)){
          return true;
        }
      }
    }
    return false;
  }
}
