import styled from "styled-components";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import { useCheckout } from "../check-in-out/useCheckout";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const { cabin, guest } = booking;
  const { id: _id, startDate, endDate, numNight, totalPrice, status } = booking;
  const { fullName: guestName, email } = guest;
  const { checkout, isCheckingout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { name: cabinName } = cabin;
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNight} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={_id} />
          <Menus.List id={_id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${_id}`)}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${_id}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                disable={isCheckingout}
                onClick={() => checkout(_id)}
                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="bookings"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(_id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
