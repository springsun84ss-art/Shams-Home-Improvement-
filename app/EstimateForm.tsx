"use client";

import { FormEvent, useState } from "react";

const projectTypes = ["Bathroom Remodeling", "Tile & Flooring", "Plumbing", "Electrical", "Painting & Repairs", "Carpentry & Doors", "Decks", "Covered Porches", "Countertops & Cabinets", "Other"];

export default function EstimateForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "draft" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.email && !data.phone) { setState("error"); setMessage("Please provide an email address or phone number so we can reply."); return; }
    setState("sending");
    try {
      const response = await fetch("/api/estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (response.status === 503) {
        const subject = `Estimate request: ${data.projectType} in ${data.zip}`;
        const body = [`Name: ${data.firstName} ${data.lastName}`, `Email: ${data.email || "Not provided"}`, `Phone: ${data.phone || "Not provided"}`, `Location: ${data.city}, ${data.zip}`, `Service: ${data.projectType}`, "", "Project details:", String(data.details)].join("\n");
        window.location.href = `mailto:rabeee@shamshomeimprovement.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setState("draft"); setMessage("Your email app should open with the request. Press Send there to finish. If it does not open, call or text 404-635-6502.");
        return;
      }
      if (!response.ok) throw new Error("Unable to send your request right now. Please call or text us at 404-635-6502.");
      form.reset(); setState("sent"); setMessage("Thank you. Your request was sent. We’ll get back to you soon.");
    } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "Unable to send your request. Please call us."); }
  }
  return <form className="estimateForm" onSubmit={submit}>
    <h3>Request a free estimate</h3>
    <p>Tell us about your project. We’ll contact you to discuss the details. If your email app opens, press Send there to finish your request.</p>
    <div className="formRow"><label>First name<input name="firstName" required maxLength={80} autoComplete="given-name" /></label><label>Last name<input name="lastName" required maxLength={80} autoComplete="family-name" /></label></div>
    <div className="formRow"><label>Email<input name="email" type="email" maxLength={254} autoComplete="email" /></label><label>Phone<input name="phone" type="tel" maxLength={30} autoComplete="tel" /></label></div>
    <div className="formRow"><label>City or location<input name="city" required maxLength={100} autoComplete="address-level2" /></label><label>ZIP code<input name="zip" required inputMode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" title="Enter a 5-digit ZIP code" autoComplete="postal-code" /></label></div>
    <label>What kind of work do you need?<select name="projectType" required defaultValue=""><option value="" disabled>Select a service</option>{projectTypes.map(type => <option key={type}>{type}</option>)}</select></label>
    <label>Tell us about the project<textarea name="details" required minLength={10} maxLength={3000} rows={5} placeholder="What would you like us to repair or improve?" /></label>
    <div className="hiddenField" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Submit Request"}</button>
    {message && <p className={state === "sent" || state === "draft" ? "formSuccess" : "formError"} role="status">{message}</p>}
  </form>;
}
