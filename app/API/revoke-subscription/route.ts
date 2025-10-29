import { NextRequest, NextResponse } from 'next/server';
import { base } from '@base-org/account/node';

// IMPORTANT: This wallet name must match the one used in create-wallet/route.ts
const WALLET_NAME = 'bbq-sub-v1';

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId } = await request.json();
    
    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscriptionId' },
        { status: 400 }
      );
    }

    // Use the CDP server wallet to revoke the subscription
    const revokeResult = await base.subscription.revoke({
      id: subscriptionId,
      testnet: true,
      walletName: WALLET_NAME,
      cdpApiKeyId: process.env.CDP_API_KEY_ID,
      cdpApiKeySecret: process.env.CDP_API_KEY_SECRET,
      cdpWalletSecret: process.env.CDP_WALLET_SECRET,
    });

    console.log(`Successfully revoked subscription: ${subscriptionId}`);

    return NextResponse.json({
      success: true,
      subscriptionId,
      message: 'Subscription revoked successfully',
      revokeResult
    });

  } catch (error: any) {
    console.error('Revoke failed:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to revoke subscription'
      },
      { status: 500 }
    );
  }
}



