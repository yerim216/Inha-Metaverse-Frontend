import React from "react";

export default function ForMobile() {
  return (
    <section className="w-screen h-screen bg-white flex items-center justify-center">
      <pre className="text-center font-bold animate-bounce text-2xl">
        {
          "모바일 환경에 접속 중이신 것으로 보여요.\n모바일 환경은 준비 중이니 잠시만 기다려 주세요!"
        }
      </pre>
    </section>
  );
}
