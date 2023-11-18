import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => {
    setConfirmPaid(booking?.booking?.isPaid ?? false);
  }, [booking?.booking?.isPaid]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  const [dataSetting] = settings.setting;
  const {
    id: _id,
    numNight,
    numGuest,
    guest: { fullName },
    totalPrice,
  } = booking.booking;
  const optionalBreakfastPrice =
    dataSetting.breakFastPrice * numNight * numGuest;
  console.log(optionalBreakfastPrice);
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        id: _id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ id: _id });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{_id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking.booking} />
      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid(false);
          }}
          id="breakfast"
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}{" "}
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          i confirm that guest {fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )} )`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{_id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
