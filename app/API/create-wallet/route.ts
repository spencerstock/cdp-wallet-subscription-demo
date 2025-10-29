import { NextResponse } from 'next/server';
import { base } from '@base-org/account';

// IMPORTANT: This wallet name must match the one used in charge-subscription/route.ts
const WALLET_NAME = 'bbq-sub-v1';

export async function POST() {
  try {
    // Get or create a CDP smart wallet to act as the subscription owner
    // @ts-ignore - Type definitions may not be complete for the local SDK version
    const owner = await base.subscription.getOrCreateSubscriptionOwnerWallet({
      cdpApiKeyId: process.env.CDP_API_KEY_ID,
      cdpApiKeySecret: process.env.CDP_API_KEY_SECRET,
      cdpWalletSecret: process.env.CDP_WALLET_SECRET,
      walletName: WALLET_NAME,
    });
    
    // Return the smart wallet address
    // This is the address that should be used as the subscriptionOwner when creating subscriptions
    return NextResponse.json({
      address: owner.address,
      walletName: owner.walletName,
      message: 'CDP smart wallet ready for subscription management'
    });
  } catch (error: any) {
    console.error('Error creating/retrieving wallet:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create/retrieve wallet'
      },
      { status: 500 }
    );
  }
}