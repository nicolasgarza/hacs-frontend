import React, { useState } from "react";
import "./AdminPage.scss";
import { newUid } from "../utils/utils";

function EventEdit(props) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    ...props.data,
    uid: props.data.uid ?? newUid("event"),
  });

  const handleSave = () => {
    props.handleUpdate("events", data);
    setEditing(false);
    setData({ uid: newUid("event") });
  };

  const handleChange = (e) => {
    let newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleDelete = () => {
    props.handleDelete("events", data.uid);
    setEditing(false);
  };

  const editSection = (
    <div className="admin-edit">
      <form>
        <label>Event Title</label>
        <input
          id="event-title-edit"
          className="form-control-small"
          name="title"
          defaultValue={data?.title}
          placeholder="ex.: Diversity Networking Event"
          required
          onChange={handleChange}
        />
        <label>Start Time</label>
        <input
          id="event-start-time-edit"
          className="form-control-small"
          name="startTime"
          defaultValue={data?.startTime}
          placeholder="ex.: 2021-08-10T16:54:47.261Z"
          required
          onChange={handleChange}
        />
        <label>End Time</label>
        <input
          id="event-end-time-edit"
          className="form-control-small"
          name="endTime"
          defaultValue={data?.endTime}
          placeholder="ex.: 2021-08-10T16:54:47.261Z"
          required
          onChange={handleChange}
        />
        <label>Image URL</label>
        <input
          id="event-image-url-edit"
          className="form-control-small"
          name="imageUrl"
          defaultValue={data?.img}
          placeholder="ex.: https://firebasestorage.googleapis.com/..."
          onChange={handleChange}
        />
        <label>Meeting Link</label>
        <input
          id="event-meeting-link-edit"
          className="form-control-small"
          name="meetingLink"
          defaultValue={data?.meetingLink}
          placeholder="ex.: https://utexas.zoom.us/j/..."
          required
          onChange={handleChange}
        />
        <label>RSVP Link</label>
        <input
          id="event-rsvp-link-edit"
          className="form-control-small"
          name="rsvpLink"
          defaultValue={data?.rsvpLink}
          placeholder="ex.: https://forms.gle/..."
          required
          onChange={handleChange}
        />
        <label>Event Location</label>
        <input
          id="event-location-edit"
          className="form-control-small"
          name="location"
          defaultValue={data?.location}
          placeholder="ex.: GDC 5.302"
          required
          onChange={handleChange}
        />
        <label>Event Description</label>
        <input
          id="event-description-edit"
          className="form-control-small"
          name="description"
          defaultValue={data?.description}
          placeholder="Include all major details surrounding the event"
          required
          onChange={handleChange}
        />
        <label>Other Links</label>
        <input
          id="event-other-links-edit"
          className="form-control-small"
          name="otherLinks"
          defaultValue={data?.otherLinks}
          placeholder="ex.: flyer link, merch sign up, etc."
          required
          onChange={handleChange}
        />
        <label>Event UID</label>
        <input
          id="event-uid-edit"
          className="form-control-small"
          name="uid"
          value={data?.uid ?? newUid("event")}
          required
          readOnly
          onChange={handleChange}
        />
      </form>
      <button className="btn btn-primary" onClick={handleSave} type="submit">
        Save
      </button>
      <button className="btn btn-primary" onClick={handleDelete} type="button">
        Delete
      </button>
    </div>
  );

  const saveSection = (
    <div onClick={() => setEditing(editing ^ true)}>
      <p className="editable">
        {props.data?.title == null ? (
          "Add Event"
        ) : (
          <span>{props.data?.title}</span>
        )}
      </p>
      {/* TODO: Add X mark to close dropdown */}
    </div>
  );

  return (
    <div className="editable-group">
      {saveSection}
      {!!editing && editSection}
    </div>
  );
}

export default EventEdit;