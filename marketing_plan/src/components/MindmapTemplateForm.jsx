import { useState } from 'preact/hooks';
import { FormSection } from './FormSection';

export function MindmapTemplateForm({ templateData, onTemplateDataChange }) {
  const [useDefaultTemplate, setUseDefaultTemplate] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onTemplateDataChange({
      ...templateData,
      [name]: value,
    });
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    onTemplateDataChange({
      ...templateData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onTemplateDataChange({
        ...templateData,
        templateFile: files[0],
      });
    }
  };

  return (
    <FormSection 
      title="마인드맵 템플릿" 
      description="기존에 사용하던 마인드맵 템플릿을 업로드하거나 기본 템플릿을 사용할 수 있습니다"
    >
      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useDefaultTemplate}
            onChange={(e) => {
              setUseDefaultTemplate(e.target.checked);
              if (e.target.checked) {
                onTemplateDataChange({
                  ...templateData,
                  useDefault: true,
                  templateFile: null,
                });
              }
            }}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            기본 템플릿 사용
          </span>
        </label>
      </div>

      {!useDefaultTemplate && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              마인드맵 템플릿 파일 업로드
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">클릭하여 파일 선택</span> 또는 드래그 앤 드롭
                  </p>
                  <p className="text-xs text-gray-500">JSON, XML, MMD 등 (최대 10MB)</p>
                </div>
                <input
                  type="file"
                  name="templateFile"
                  accept=".json,.xml,.mmd,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {templateData.templateFile && (
              <p className="mt-2 text-sm text-gray-600">
                선택된 파일: <span className="font-medium">{templateData.templateFile.name}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              템플릿 설명 (선택사항)
            </label>
            <textarea
              name="templateDescription"
              value={templateData.templateDescription || ''}
              onChange={handleTextareaChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="템플릿에 대한 설명이나 사용 방법을 작성해주세요"
            />
          </div>
        </div>
      )}

      {useDefaultTemplate && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            기본 마인드맵 템플릿을 사용합니다. 표준 구조로 마케팅 플랜이 생성됩니다.
          </p>
        </div>
      )}
    </FormSection>
  );
}

