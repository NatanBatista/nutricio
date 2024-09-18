interface NutricionalValue {
    id: number;
    protein: number;
    total_carbohydrate: number;
    lipids: number;
    dietary_fiber: number;
    energy_kcal: number;
    vitamin_a: number;
    vitamin_c: number;
    thiamine: number;
    niacin: number;
    vitamin_b6: number;
    phosphorus: number;
    iron: number;
    sodium: number;
    potassium: number;
    calcium: number;
    magnesium: number;
    manganese: number;
    copper: number;
    zinc: number;
    food_id: number;
    created_at: string;
    updated_at: string;
}

interface Food {
    id: number;
    name: string;
    table: string;
    scientific_name: string;
    code: string;
    created_at: string;
    updated_at: string;
    nutricional_value: NutricionalValue;
}

interface Foods {
    foods: Food[]
}


interface Meta {
    current_page: number
    total_pages: number
    total_count: number
}

interface ResponseFood {
    foods: Food[]
    meta: Meta
}