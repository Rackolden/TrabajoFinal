import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { query } from "$lib/server/db";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { nombre, email, password } = await request.json();

    if (!nombre || !email || !password) {
      return json({ message: "Campos incompletos" }, { status: 400 });
    }

    // Guardar usuario en tu DB llamada "TF"
    const sql = `
            INSERT INTO usuarios (nombres_completos, email, pw)
            VALUES (?, ?, ?)
        `;

    await query(sql, [nombre, email, password]);

    return json(
      { message: "Usuario registrado correctamente" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error(err);
    return json(
      { message: "Error en el servidor al registrar usuario" },
      { status: 500 },
    );
  }
};
