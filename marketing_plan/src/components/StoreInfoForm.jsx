import { useState } from 'preact/hooks';
import { FormSection } from './FormSection';
import { FileUpload } from './FileUpload';

export function StoreInfoForm({ formData, onFormDataChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (name) => (files) => {
    onFormDataChange({
      ...formData,
      [name]: files,
    });
  };

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <FormSection title="기본 정보" description="가게의 기본 정보를 입력해주세요">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              업체명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName || ''}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: 맛있는 카페"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              업체 위치 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="storeLocation"
              value={formData.storeLocation || ''}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: 서울시 강남구 테헤란로 123"
            />
          </div>
        </div>
      </FormSection>

      {/* 브랜드 소개 */}
      <FormSection title="브랜드 소개" description="브랜드에 대한 소개를 작성해주세요">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            브랜드 소개 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="brandIntroduction"
            value={formData.brandIntroduction || ''}
            onChange={handleTextareaChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="브랜드의 역사, 철학, 목표 등을 작성해주세요"
          />
        </div>
      </FormSection>

      {/* 서비스 정보 */}
      <FormSection title="서비스 정보" description="제공하는 서비스와 메뉴에 대한 정보를 입력해주세요">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            서비스 항목 (메뉴 및 제공 항목) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="serviceItems"
            value={formData.serviceItems || ''}
            onChange={handleTextareaChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="제공하는 메뉴나 서비스 항목을 나열해주세요 (예: 아메리카노, 카페라떼, 케이크 등)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            서비스 히스토리
          </label>
          <textarea
            name="serviceHistory"
            value={formData.serviceHistory || ''}
            onChange={handleTextareaChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="서비스나 브랜드의 역사를 작성해주세요"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            서비스 특징 (맛 특징) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="serviceFeatures"
            value={formData.serviceFeatures || ''}
            onChange={handleTextareaChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="서비스나 음식의 특징, 맛의 특징 등을 작성해주세요"
          />
        </div>
      </FormSection>

      {/* 이미지 업로드 */}
      <FormSection title="이미지 자료" description="BI 로고와 메뉴 사진을 업로드해주세요">
        <FileUpload
          label="BI 로고"
          name="biLogo"
          accept="image/*"
          required
          onFileChange={handleFileChange('biLogo')}
        />
        <FileUpload
          label="메뉴 사진"
          name="menuPhotos"
          accept="image/*"
          required
          multiple
          onFileChange={handleFileChange('menuPhotos')}
        />
      </FormSection>

      {/* 연락처 정보 */}
      <FormSection title="연락처 정보" description="업체 담당자 연락처를 입력해주세요">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              담당자 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName || ''}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="담당자 이름"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone || ''}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="010-1234-5678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>
        </div>
      </FormSection>

      {/* 시스템 접근 정보 */}
      <FormSection title="시스템 접근 정보" description="포스기 및 SNS 계정 정보를 입력해주세요">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              포스기 아이디
            </label>
            <input
              type="text"
              name="posId"
              value={formData.posId || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="포스기 아이디"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              포스기 비밀번호
            </label>
            <input
              type="password"
              name="posPassword"
              value={formData.posPassword || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="포스기 비밀번호"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SNS 아이디
            </label>
            <input
              type="text"
              name="snsId"
              value={formData.snsId || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="인스타그램, 페이스북 등"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SNS 비밀번호
            </label>
            <input
              type="password"
              name="snsPassword"
              value={formData.snsPassword || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SNS 비밀번호"
            />
          </div>
        </div>
      </FormSection>

      {/* 웹사이트 및 지도 정보 */}
      <FormSection title="웹사이트 및 지도 정보" description="홈페이지와 지도 주소를 입력해주세요">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              홈페이지 주소
            </label>
            <input
              type="url"
              name="websiteUrl"
              value={formData.websiteUrl || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              네이버 지도 주소
            </label>
            <input
              type="url"
              name="naverMapUrl"
              value={formData.naverMapUrl || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="네이버 지도 URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              구글 지도 주소
            </label>
            <input
              type="url"
              name="googleMapUrl"
              value={formData.googleMapUrl || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="구글 지도 URL"
            />
          </div>
        </div>
      </FormSection>

      {/* 홍보 가이드라인 */}
      <FormSection title="홍보 가이드라인" description="마케팅 시 참고할 홍보 가이드라인을 작성해주세요">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            홍보 가이드라인
          </label>
          <textarea
            name="promotionGuidelines"
            value={formData.promotionGuidelines || ''}
            onChange={handleTextareaChange}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="마케팅 시 지켜야 할 브랜드 톤앤매너, 금지 사항, 강조하고 싶은 포인트 등을 작성해주세요"
          />
        </div>
      </FormSection>
    </div>
  );
}

