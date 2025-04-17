/* eslint-disable */
import { auth } from '@clerk/nextjs/server';

import prismadb from './prismadb';

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    const userSuscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId,
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPreriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    });

    if (!userSuscription) {
        return false;
    }

    const isValid = 
        userSuscription.stripePriceId &&
        userSuscription.stripeCurrentPreriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid;
};