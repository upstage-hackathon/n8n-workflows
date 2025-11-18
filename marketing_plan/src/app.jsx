import { useState } from 'preact/hooks';
import { StoreInfoForm } from './components/StoreInfoForm';
import { MindmapTemplateForm } from './components/MindmapTemplateForm';
import './app.css';

export function App() {
  const [storeInfo, setStoreInfo] = useState({});
  const [templateInfo, setTemplateInfo] = useState({ useDefault: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: n8n 웹훅으로 데이터 전송
      const formData = new FormData();
      
      // 가게 정보 추가
      Object.keys(storeInfo).forEach(key => {
        if (key === 'biLogo' || key === 'menuPhotos') {
          // 파일은 별도로 처리
          const files = storeInfo[key];
          if (files) {
            if (files instanceof FileList) {
              Array.from(files).forEach((file, index) => {
                formData.append(`${key}_${index}`, file);
              });
            } else if (files instanceof File) {
              formData.append(key, files);
            }
          }
        } else {
          formData.append(key, storeInfo[key] || '');
        }
      });

      // 템플릿 정보 추가
      formData.append('useDefaultTemplate', templateInfo.useDefault || false);
      if (templateInfo.templateFile) {
        formData.append('templateFile', templateInfo.templateFile);
      }
      if (templateInfo.templateDescription) {
        formData.append('templateDescription', templateInfo.templateDescription);
      }

      // n8n 웹훅 URL (환경변수 또는 직접 설정)
      const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';
      
      if (!n8nWebhookUrl) {
        throw new Error('n8n 웹훅 URL이 설정되지 않았습니다. 환경변수 VITE_N8N_WEBHOOK_URL을 설정해주세요.');
      }

      // n8n 웹훅으로 데이터 전송
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status} ${response.statusText}`);
      }

      const result = await response.json().catch(() => ({ success: true }));
      
      setSubmitStatus({ 
        success: true, 
        message: '폼이 성공적으로 제출되었습니다! n8n으로 전송되었습니다.' 
      });
      setIsSubmitting(false);

    } catch (error) {
      setSubmitStatus({ success: false, message: '제출 중 오류가 발생했습니다: ' + error.message });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            로컬업체 마케팅 플랜 생성
          </h1>
          <p className="text-gray-600">
            마케팅 회사 담당자님, 아래 폼을 작성하여 마케팅 플랜 생성을 요청해주세요.
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 가게 기본정보 폼 */}
          <StoreInfoForm 
            formData={storeInfo} 
            onFormDataChange={setStoreInfo} 
          />

          {/* 마인드맵 템플릿 폼 */}
          <MindmapTemplateForm 
            templateData={templateInfo} 
            onTemplateDataChange={setTemplateInfo} 
          />

          {/* 제출 버튼 및 상태 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {submitStatus && (
              <div className={`mb-4 p-4 rounded-lg ${
                submitStatus.success 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <p className="font-medium">{submitStatus.message}</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setStoreInfo({});
                  setTemplateInfo({ useDefault: true });
                  setSubmitStatus(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                초기화
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '제출 중...' : '제출하기'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
