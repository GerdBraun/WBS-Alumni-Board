export const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>Effective Date: {new Date().getFullYear()}</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to the FULLSTACK.team! This privacy policy outlines how we
        collect, use, store, and protect your personal data in accordance with
        the General Data Protection Regulation (GDPR). By using our website and
        services, you agree to the collection and use of your data as described
        in this policy.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We collect the following types of personal data when you use our website
        or services:
      </p>
      <ul>
        <li>
          <strong>Personal Identification Information:</strong> Name, email
          address, phone number, etc.
        </li>
        <li>
          <strong>Usage Data:</strong> Information on how you use our website
          (e.g., IP address, browser type, pages visited).
        </li>
        <li>
          <strong>Cookies and Tracking Technologies:</strong> We use cookies to
          enhance your experience and track usage statistics.
        </li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>We use your personal data for the following purposes:</p>
      <ul>
        <li>To provide and improve our services.</li>
        <li>
          To communicate with you (e.g., send updates, promotional offers, or
          support information).
        </li>
        <li>
          To comply with legal obligations and enforce our terms and policies.
        </li>
      </ul>

      <h2>4. Legal Basis for Processing Your Data</h2>
      <p>We process your personal data based on the following legal grounds:</p>
      <ul>
        <li>
          <strong>Consent:</strong> You have given us consent to process your
          personal data.
        </li>
        <li>
          <strong>Contractual Necessity:</strong> Processing is necessary for
          the performance of a contract.
        </li>
        <li>
          <strong>Legitimate Interests:</strong> Processing is necessary for our
          legitimate business interests.
        </li>
        <li>
          <strong>Legal Obligation:</strong> We may need to process your data to
          comply with applicable laws.
        </li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>
        We will retain your personal data only for as long as necessary to
        fulfill the purposes outlined in this privacy policy or as required by
        law. Once your data is no longer needed, we will securely delete or
        anonymize it.
      </p>

      <h2>6. Your Rights Under GDPR</h2>
      <p>You have the following rights regarding your personal data:</p>
      <ul>
        <li>
          <strong>Right to Access:</strong> You have the right to request access
          to the personal data we hold about you.
        </li>
        <li>
          <strong>Right to Rectification:</strong> You have the right to request
          that we correct any inaccuracies in your personal data.
        </li>
        <li>
          <strong>Right to Erasure (Right to be Forgotten):</strong> You have
          the right to request that we delete your personal data under certain
          conditions.
        </li>
        <li>
          <strong>Right to Restriction of Processing:</strong> You have the
          right to request the restriction of processing of your personal data
          in certain circumstances.
        </li>
        <li>
          <strong>Right to Data Portability:</strong> You have the right to
          request that we transfer your data to another service provider in a
          structured, commonly used, and machine-readable format.
        </li>
        <li>
          <strong>Right to Object:</strong> You have the right to object to the
          processing of your personal data for certain purposes, such as direct
          marketing.
        </li>
        <li>
          <strong>Right to Withdraw Consent:</strong> If we rely on your consent
          to process data, you have the right to withdraw it at any time.
        </li>
      </ul>

      <p>
        If you wish to exercise any of these rights, please contact us at{" "}
        <a
          href="mailto:fullstack-team@your-d-sign.de"
          className="link link-hover"
        >
          fullstack-team@your-d-sign.de
        </a>
        .
      </p>

      <h2>7. Data Security</h2>
      <p>
        We implement a variety of security measures to protect your personal
        data, including encryption, firewalls, and secure servers. However,
        please note that no method of transmission over the internet is 100%
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>8. Cookies</h2>
      <p>
        We use cookies to improve user experience, analyze site traffic, and
        personalize content. You can choose to disable cookies through your
        browser settings, but doing so may affect the functionality of our
        website.
      </p>

      <h2>9. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not
        responsible for the privacy practices or content of these external
        sites. Please review their privacy policies before providing any
        personal information.
      </p>

      <h2>10. Changes to This Privacy Policy</h2>
      <p>
        We may update this privacy policy from time to time. Any changes will be
        posted on this page, and the updated policy will take effect immediately
        upon posting. We encourage you to review this policy periodically.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have any questions or concerns about this privacy policy or our
        data practices, please contact us at:
      </p>
      <p>
        Email:{" "}
        <a
          href="mailto:fullstack-team@your-d-sign.de"
          className="link link-hover"
        >
          fullstack-team@your-d-sign.de
        </a>
      </p>
    </div>
  );
};
