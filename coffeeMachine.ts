let availableCups: { [size: string]: number } = {
  small: 10,
  medium: 10,
  large: 10,
};

let availableCoffee: number = 50; // en gramos
let availableSugar: number = 10; // en cucharaditas

function hasCups(): boolean {
  return Object.values(availableCups).some((cups: number) => cups > 0);
}

function decrementCupSize(size: string): boolean {
  if (availableCups[size] > 0) {
    availableCups[size] -= 1;
    return true;
  } else {
    return false;
  }
}

function hasCoffee(): boolean {
  return availableCoffee > 0;
}

function decrementCoffee(amount: number): boolean {
  if (availableCoffee >= amount) {
    availableCoffee -= amount;
    return true;
  } else {
    return false;
  }
}

function hasSugar(amount: number): boolean {
  return availableSugar >= amount;
}

function decrementSugar(amount: number): boolean {
  if (availableSugar >= amount) {
    availableSugar -= amount;
    return true;
  } else {
    return false;
  }
}

function dispenseCoffee(cupSize: string, sugarAmount: number): string {
  let coffeeAmount: number;
  switch (cupSize) {
    case "small":
      coffeeAmount = 10;
      break;
    case "medium":
      coffeeAmount = 15;
      break;
    case "large":
      coffeeAmount = 20;
      break;
    default:
      return "No hay vasos disponibles";
  }
  if (!hasCups()) {
    return "No hay vasos disponibles";
  } else if (!decrementCupSize(cupSize)) {
    return "No hay vasos disponibles";
  }
  if (!hasCoffee()) {
    decrementCupSize(cupSize);
    return "No hay café disponible";
  } else if (!decrementCoffee(coffeeAmount)) {
    decrementCupSize(cupSize);
    return "No hay café suficiente para ese tamaño de vaso";
  }
  if (!hasSugar(sugarAmount)) {
    decrementCupSize(cupSize);
    decrementCoffee(coffeeAmount);
    return "No hay suficiente azúcar";
  } else if (!decrementSugar(sugarAmount)) {
    decrementCupSize(cupSize);
    decrementCoffee(coffeeAmount);
    return "No hay suficiente azúcar";
  }
  return `Aquí tienes tu café ${cupSize}, con ${sugarAmount} cucharaditas de azúcar.`;
}

console.log(dispenseCoffee("small", 1));

// Testing

describe("La máquina de café", () => {
  describe("La función hasCups", () => {
    it("debería devolver verdadero si hay vasos disponibles", () => {
      expect(hasCups()).toBe(true);
    });

    it("debería devolver falso si no hay vasos disponibles", () => {
      decrementCupSize("small");
      decrementCupSize("small");
      decrementCupSize("small");
      decrementCupSize("small");
      decrementCupSize("small");
      decrementCupSize("medium");
      decrementCupSize("medium");
      decrementCupSize("medium");
      decrementCupSize("large");
      decrementCupSize("large");

      expect(hasCups()).toBe(false);
    });
  });

  describe("La función decrementCupSize", () => {
    it("debería reducir el número de vasos disponibles si se proporciona un tamaño de vaso válido", () => {
    decrementCupSize("small");
    expect(hasCups()).toBe(true);
    expect(decrementCupSize("small")).toBe(true);
    expect(decrementCupSize("small")).toBe(true);
    expect(decrementCupSize("small")).toBe(true);
    expect(decrementCupSize("small")).toBe(true);
    expect(decrementCupSize("small")).toBe(true);
    expect(decrementCupSize("small")).toBe(false);
    expect(decrementCupSize("medium")).toBe(true);
    expect(decrementCupSize("medium")).toBe(true);
    expect(decrementCupSize("medium")).toBe(true);
    expect(decrementCupSize("medium")).toBe(false);
    expect(decrementCupSize("large")).toBe(true);
    expect(decrementCupSize("large")).toBe(false);
    expect(decrementCupSize("medium")).toBe(false);
    });
    })});

    it("debería devolver un mensaje de error cuando no hay suficiente café para un vaso grande", () => {
      availableCups.large = 5;
      availableCoffee = 15;
      availableSugar = 5;
    
      const result = dispenseCoffee("large", 2);
    
      expect(result).toBe("No hay suficiente café para ese tamaño de vaso");
    });

    it("debería devolver un mensaje de error cuando no hay suficiente azúcar disponible", () => {
      availableCups.medium = 3;
      availableCoffee = 20;
      availableSugar = 1;
    
      const result = dispenseCoffee("medium", 2);
    
      expect(result).toBe("No hay suficiente azúcar");
    });

    it("debería devolver un mensaje de error cuando no hay vasos disponibles", () => {
      availableCups.small = 0;
      availableCoffee = 10;
      availableSugar = 5;
    
      const result = dispenseCoffee("small", 1);
    
      expect(result).toBe("No hay vasos disponibles");
    });

    it("debería dispensar el café correctamente cuando todo está disponible", () => {
      availableCups.large = 2;
      availableCoffee = 50;
      availableSugar = 10;
    
      const result = dispenseCoffee("large", 3);
    
      expect(result).toBe("Aquí tienes tu café grande, con 3 cucharaditas de azúcar.");
      expect(availableCups.large).toBe(1);
      expect(availableCoffee).toBe(30);
      expect(availableSugar).toBe(7);
    });
    

