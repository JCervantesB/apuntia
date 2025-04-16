import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb"
import { MAX_FREE_COUNTS } from "../../constants"

export const increaseApiLimit = async () => {
  const { userId } = await auth()
  if (!userId) return

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: { count: { increment: 1 } },
    })
  } else {
    await prismadb.userApiLimit.create({
      data: { userId, count: 1 },
    })
  }
}

export const checkApiLimit = async () => {
  const { userId } = await auth()
  if (!userId) return false

  const isPremium = await prismadb.userSubscription.findUnique({
    where: { userId },
  })

  if (isPremium) return true

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  return !userApiLimit || userApiLimit.count < MAX_FREE_COUNTS
}

export const checkTokenLimit = async () => {
    const { userId } = await auth();
    if (!userId) return false;
  
    // Consultamos la tabla UserApiLimit para obtener los tokens disponibles del usuario
    const user = await prismadb.userApiLimit.findUnique({
      where: { userId },
    });
  
    if (!user) return false;
  
    // Consultamos si el usuario es premium
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });
  
    // Si el usuario es premium, simplemente revisamos si tiene más de 1000 tokens disponibles
    if (userSubscription) {
      return user.tokens > 1000;  // Verificamos si tiene suficientes tokens para operar
    }
  
    // Si el usuario no es premium, solo verificamos si tiene más de 1000 tokens disponibles
    return user.tokens > 1000;  // También verificamos para usuarios no premium
};


export const decreaseTokens = async (tokensUsed: number, userId: string) => {
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: { userId },
    });
  
    if (!userApiLimit) {
      throw new Error("User API limit not found");
    }
  
    // Restamos los tokens utilizados al usuario
    await prismadb.userApiLimit.update({
      where: { userId },
      data: {
        tokens: {
          decrement: tokensUsed,
        },
      },
    });
  };