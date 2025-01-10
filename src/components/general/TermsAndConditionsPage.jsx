import { Link } from "react-router-dom";

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>

      <p>Effective Date:  {new Date().getFullYear()}</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to FULLSTACK.team. These terms and conditions outline the rules
        and regulations for the use of FULLSTACK.team&apos;s website and services, in
        accordance with the General Data Protection Regulation (GDPR). By
        accessing or using our website, you agree to be bound by these terms. If
        you disagree with any part of the terms, you must not use our services.
      </p>

      <h2>2. Intellectual Property Rights</h2>
      <p>
        Unless otherwise stated, FULLSTACK.team and/or its licensors own the
        intellectual property rights for all material on this website. All
        intellectual property rights are reserved. You may access this for
        personal use, subject to restrictions set in these terms and conditions.
      </p>
      <p>You must not:</p>
      <ul>
        <li>Republish material from this website.</li>
        <li>Sell, rent or sub-license material from the website.</li>
        <li>
          Reproduce, duplicate or copy material from this website for commercial
          purposes.
        </li>
        <li>Redistribute content from FULLSTACK.team.</li>
      </ul>

      <h2>3. Use of Our Services</h2>
      <p>
        By using our services, you agree to comply with the following rules:
      </p>
      <ul>
        <li>
          You must provide accurate and complete information when creating an
          account or using our services.
        </li>
        <li>
          You are responsible for maintaining the confidentiality of your
          account and password.
        </li>
        <li>
          You agree to use our services for lawful purposes and in a manner that
          does not infringe the rights of others or restrict their use of the
          service.
        </li>
      </ul>

      <h2>4. User Accounts</h2>
      <p>
        To access certain features of our website, you may be required to create
        an account. By creating an account, you agree to:
      </p>
      <ul>
        <li>
          Provide accurate, current, and complete information during the
          registration process.
        </li>
        <li>
          Maintain the security and confidentiality of your account and
          password.
        </li>
        <li>
          Immediately notify us of any unauthorized use of your account or
          security breach.
        </li>
      </ul>

      <h2>5. Data Collection and Privacy</h2>
      <p>
        We respect your privacy and are committed to protecting your personal
        data in accordance with the General Data Protection Regulation (GDPR).
        For information on how we collect, store, and use your personal data,
        please refer to our <Link to="/privacy">Privacy Policy</Link>.
      </p>
      <p>
        By using our services, you consent to the collection and processing of
        your personal data as described in our Privacy Policy. You may withdraw
        consent at any time by contacting us at <a
          href="mailto:fullstack-team@your-d-sign.de"
          className="link link-hover"
        >fullstack-team@your-d-sign.de</a>
      </p>

      <h2>6. Payment Terms</h2>
      <p>
        If applicable, payments for our services will be processed through
        [Payment Processor Name]. You agree to provide accurate billing
        information, including your name, address, and credit card details. All
        payments are subject to the terms and conditions of the payment
        processor.
      </p>
      <p>
        All fees are non-refundable unless stated otherwise in our refund
        policy.
      </p>

      <h2>7. Termination of Services</h2>
      <p>
        We reserve the right to suspend or terminate your access to our services
        at our sole discretion, without notice, for conduct that violates these
        Terms and Conditions or is harmful to other users, our business, or our
        reputation.
      </p>
      <p>
        Upon termination, your right to access or use our services will cease
        immediately, and we may delete your account and data as outlined in our
        Privacy Policy.
      </p>

      <h2>8. Disclaimers and Limitations of Liability</h2>
      <p>
        Our services are provided on an &quot;as is&quot; basis, without any warranties of
        any kind, either express or implied, including but not limited to the
        warranties of merchantability or fitness for a particular purpose.
      </p>
      <p>
        In no event shall FULLSTACK.team be liable for any indirect, incidental,
        special, consequential, or punitive damages arising out of or related to
        your use of our services, even if we have been advised of the
        possibility of such damages.
      </p>

      <h2>9. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless FULLSTACK.team, its
        affiliates, employees, agents, and licensors from any and all claims,
        liabilities, damages, losses, or expenses (including legal fees) arising
        out of your violation of these Terms and Conditions, use of our website,
        or any action taken in relation to your account.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of Germany. Any disputes arising
        out of or in connection with these terms will be subject to the
        exclusive jurisdiction of the courts located in Germany.
      </p>

      <h2>11. Changes to These Terms</h2>
      <p>
        We may update these Terms and Conditions from time to time to reflect
        changes in our services, legal requirements, or business practices. Any
        changes will be posted on this page, and the updated Terms will take
        effect immediately upon posting. We encourage you to review these Terms
        regularly.
      </p>

      <h2>12. Contact Information</h2>
      <p>
        If you have any questions or concerns about these Terms and Conditions,
        please contact us at:
      </p>
      <p>
        Email:
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

export default TermsAndConditionsPage;
