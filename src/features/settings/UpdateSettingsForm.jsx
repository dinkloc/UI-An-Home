import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const data = { ...settings };

  const { editSetting, isEditing } = useUpdateSettings();
  if (isLoading) return <Spinner />;
  const [a] = data.setting;
  const {
    _id,
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakFastPrice,
  } = a;
  const handleUpdate = (event, field) => {
    const { value } = event.target;
    if (!value) return;
    editSetting({ newSetting: { [field]: value }, id: _id });
  };
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          defaultValue={minBookingLength}
          disabled={isEditing}
          type="number"
          id="min-nights"
          onBlur={(event) => handleUpdate(event, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={maxBookingLength}
          type="number"
          disabled={isEditing}
          id="max-nights"
          onBlur={(event) => handleUpdate(event, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={maxGuestPerBooking}
          type="number"
          disabled={isEditing}
          id="max-guests"
          onBlur={(event) => handleUpdate(event, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={breakFastPrice}
          type="number"
          disabled={isEditing}
          id="breakfast-price"
          onBlur={(event) => handleUpdate(event, "breakFastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
