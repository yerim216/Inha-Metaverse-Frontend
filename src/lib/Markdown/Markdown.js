import React, { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const Markdown = React.memo(({ linkStopPropagation, children }) => {
   const handleLinkClick = useCallback((event) => {
      event.stopPropagation();
   }, []);
   const exDescription = `# SmartRecipe 프로젝트\n\n"SmartRecipe" 프로젝트는 현대인들의 바쁜 일상에서 더 편리하고 창의적인 요리 경험을 제공하는 웹 어플리케이션입니다.\n\n## 주요 기능\n\n- **맞춤형 레시피 추천:**\n  - 사용자의 식습관과 취향을 고려하여 최적의 레시피를 제안합니다.\n\n- **식재료 관리:**\n  - 냉장고에 있는 식재료를 등록하고 유통기한을 추적합니다.\n\n- **식사 계획 및 쇼핑 목록:**\n  - 주간 또는 월간 식사 계획을 세우고 필요한 식재료를 자동으로 쇼핑 목록에 추가합니다.\n\n- **커뮤니티 기능:**\n  - 다른 사용자들과 레시피를 공유하고 의견을 나눌 수 있는 커뮤니티를 제공합니다.\n\n## 기술 스택\n\n- Frontend: React.js\n- Backend: Node.js, Express.js\n- 데이터베이스: MongoDB\n- 인증 및 보안: JWT, HTTPS\n\n## 프로젝트 목표\n\n"SmartRecipe"의 목표는 사용자들이 더 효율적으로 식사를 계획하고 요리하는 데 도움을 주어, 건강한 식습관을 유지하고 요리에 대한 부담을 줄이는 것입니다. 이 어플리케이션은 사용자들에게 더 많은 즐거움과 창의성을 요리에 더할 수 있도록 지원합니다.`;

   const linkRenderer = useCallback(
      ({ node, ...linkProps }) => <a {...linkProps} onClick={handleLinkClick} />,
      [handleLinkClick]
   );

   let renderers;

   if (linkStopPropagation) {
      renderers = {
         link: linkRenderer,
      };
   }

   return <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers} children={children} />;
});

export default Markdown;
