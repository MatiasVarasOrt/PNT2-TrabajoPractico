const DEFAULT_MOCK_API_BASE =
  "https://690160fdff8d792314bd3f83.mockapi.io/api/v1";
const ARTISTAS_RESOURCE = "/artistas";
const CANCIONES_RESOURCE = "/canciones";
const MOCK_API_BASE_URL =
  process.env.NEXT_PUBLIC_MOCK_API_BASE?.replace(/\/$/, "") ||
  DEFAULT_MOCK_API_BASE;

function resolveCancionPath(id, artistId) {
  if (!id) {
    throw new Error("Se requiere un id");
  }

  if (artistId) {
    return `${ARTISTAS_RESOURCE}/${artistId}${CANCIONES_RESOURCE}/${id}`;
  }

  return `${CANCIONES_RESOURCE}/${id}`;
}


async function obtenerCanciones() {
  const response = await fetch(`${MOCK_API_BASE_URL}${CANCIONES_RESOURCE}`);

  if (!response.ok) {
    const detalles = await response.text();
    throw new Error(`Error ${response.status}: ${detalles}`);
  }

  return response.json();
}


async function obtenerCancion(id) {
  const path = resolveCancionPath(id);
  const response = await fetch(`${MOCK_API_BASE_URL}${path}`);

  if (!response.ok) {
    const detalles = await response.text();
    throw new Error(`Error ${response.status}: ${detalles}`);
  }

  return response.json();
}


async function crearCancion(payload) {
  if (!payload) {
    throw new Error("Se requiere un payload para crear la canción");
  }

  const response = await fetch(`${MOCK_API_BASE_URL}${CANCIONES_RESOURCE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detalles = await response.text();
    throw new Error(`Error ${response.status}: ${detalles}`);
  }

  return response.json();
}

async function actualizarCancion(id, payload) {
  if (!payload) {
    throw new Error("Se requiere un payload para actualizar la canción");
  }

  const path = resolveCancionPath(id);
  const response = await fetch(`${MOCK_API_BASE_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detalles = await response.text();
    throw new Error(`Error ${response.status}: ${detalles}`);
  }

  return response.json();
}


async function eliminarCancion(id, artistId) {
  const paths = [];

  if (artistId) {
    paths.push(resolveCancionPath(id, artistId));
  }
  paths.push(resolveCancionPath(id));

  let lastError = null;

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const response = await fetch(`${MOCK_API_BASE_URL}${path}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return response.status === 204 ? null : response.json();
    }

    if (response.status === 404) {
      if (i < paths.length - 1) {
        continue;
      }
      return null; //hay un error en mockapi al eliminar, canciones, hay algunas canciones que figuran en la UI que no estan mas en la data de mockapi, por ende cuando se intenta eliminar no anda
                  // para manejar esto y no devolver un 404 que es directo de la api de mockapi, o sea del servidor de ellos, ya que no existe, obte por devolver null y listo
    }

    const detalles = await response.text();
    lastError = new Error(`Error ${response.status}: ${detalles}`);
    break;
  }

  if (lastError) {
    throw lastError;
  }

  return null;
}

export {
  obtenerCanciones,
  obtenerCancion,
  crearCancion,
  actualizarCancion,
  eliminarCancion,
};
