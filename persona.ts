export interface Persona {
    nombre: string,
    edad: number,
}

export function presentarPersona (persona: Persona) {
    console.log(`Mi nombre es ${persona.nombre} y tengo ${persona.edad} años`)
}