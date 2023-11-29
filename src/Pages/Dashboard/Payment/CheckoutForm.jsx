import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const [error, setError] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const [transectionId, setTransectionId] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const axiospublic = useAxiosPublic();
  const [contest, setContest] = useState("");
  const { id } = useParams();
  //   console.log(id);

  const { user } = useAuth();
  const price = parseInt(contest.contest_price);
  console.log(price);

  useEffect(() => {
    axiospublic.get(`/contests/${id}`).then((res) => setContest(res.data));
  }, [axiospublic, id]);

  useEffect(() => {
    if (price) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment Method error", paymentMethod);
      setError("");
    }

    //   payment method

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: user?.email,
            phone: phone,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    } else {
      console.log(paymentIntent);
    }
    if (paymentIntent.status === "succeeded") {
      console.log("transaction id", paymentIntent.id);
      setTransectionId(paymentIntent.id);

      // now payment details and product info

      const paymentdetails = {
        name: name,
        email: user?.email,
        price: price,
        contest: contest,
        status: "pending",
        date: new Date(),
        phone: phone,
        transectionId: paymentIntent.id,
      };
      const paymentRes = await axiosSecure.post("/payments", paymentdetails);
      console.log("payment saved", paymentRes.data.paymentResult.insertedId);
      if (paymentRes.data.paymentResult.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your payment successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myParticipated");
      }
    }
  };
  return (
    <div>
      <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text"> Your name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="name"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              defaultValue={user?.email}
              readOnly
              name="email"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Your Phone Number</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              name="phone"
              className="input input-bordered w-full "
            />
          </div>

          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          ></CardElement>
          <button
            className="btn bg-orange-500 text-white hover:text-orange-500"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <p className="text-red-500 "> {error}</p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
