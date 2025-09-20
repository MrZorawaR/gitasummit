import React from "react";

const MapEmbed = () => {
  return (
    <div className="glass rounded-2xl overflow-hidden flex-grow shadow-lg">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.234888789699!2d77.190677375573!3d28.62272147567006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02aac1c988c9%3A0xf08c226605e04fa!2sTalkatora%20Stadium!5e0!3m2!1sen!2sin!4v1758359832008!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
};

export default MapEmbed;
