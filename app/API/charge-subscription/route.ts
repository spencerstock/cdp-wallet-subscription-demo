import { NextRequest, NextResponse } from 'next/server';
import { base } from '@base-org/account/node';

// IMPORTANT: This wallet name must match the one used in create-wallet/route.ts
const WALLET_NAME = 'bbq-sub-v1';

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId, amount, recipient } = await request.json();
    
    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscriptionId' },
        { status: 400 }
      );
    }

    // Use the amount from request, default to $1.00 if not provided
    const chargeAmount = amount || '1.00';

    // Build charge options with optional recipient
    const chargeOptions: any = {
      id: subscriptionId,
      amount: chargeAmount,
      testnet: true,
      walletName: WALLET_NAME,
      cdpApiKeyId: process.env.CDP_API_KEY_ID,
      cdpApiKeySecret: process.env.CDP_API_KEY_SECRET,
      cdpWalletSecret: process.env.CDP_WALLET_SECRET,
    };

    // Add recipient if provided
    if (recipient) {
      chargeOptions.recipient = recipient;
    }

    // Use the CDP server wallet to charge the subscription
    const chargeResult = await base.subscription.charge(chargeOptions);

    console.log(`Successfully charged subscription: ${chargeResult.id}`);
    console.log(`Amount charged: ${chargeResult.amount}`);
    console.log(`Transaction hash: ${chargeResult.id}`);
    if (recipient) {
      console.log(`Recipient: ${recipient}`);
    }

    return NextResponse.json({
      success: true,
      transactionHash: chargeResult.id,
      amount: chargeResult.amount,
      subscriptionOwner: chargeResult.subscriptionOwner,
      message: `Successfully charged $${chargeResult.amount} USDC`,
      subscriptionId: chargeResult.subscriptionId,
      ...(chargeResult.recipient && { recipient: chargeResult.recipient })
    });

  } catch (error: any) {
    console.error('Charge failed:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to charge subscription'
      },
      { status: 500 }
    );
  }
}