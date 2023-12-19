import React from 'react';

export default function ErrorMsg({ errMsg }) {
   return <span className="text-[#EE1D52] absolute bottom-0 text-sm font-medium">{errMsg}</span>;
}
