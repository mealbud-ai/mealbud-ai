'use server';

type ResendEmailResponse = {
  success: boolean;
  message: string;
};

export default async function resendEmailAction(
  email: string,
): Promise<ResendEmailResponse> {
  try {
    const apiUrl = new URL(
      '/auth/resend-email',
      process.env.NEXT_PUBLIC_API_URL,
    );

    const response = await fetch(apiUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const parsed = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          response.status === 401
            ? 'message' in parsed
              ? parsed.message
              : 'Invalid email address'
            : parsed.message || 'An error occurred while resending email',
      };
    }

    return { success: true, message: 'Verification email resent successfully' };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
