import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from endpoint
    const stripe = Stripe(
      'pk_test_51Ni4ofLP5vVGC2U76EnwH3EaqqnfWJHbf12h5K8USyV2OMLJtmNqwFUpeumZ4XLR9Eav6nxZn48yoqEMF8TAW7ry007TNLeWzH',
    );
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);
    // 2) Create checkout from + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
