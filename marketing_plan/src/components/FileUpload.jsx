import { useState } from 'preact/hooks';

export function FileUpload({ label, name, accept, required = false, multiple = false, onFileChange }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (multiple) {
        const fileNames = Array.from(files).map(f => f.name).join(', ');
        setFileName(fileNames);
      } else {
        setFileName(files[0].name);
      }
      if (onFileChange) {
        onFileChange(files);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
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
            <p className="text-xs text-gray-500">PNG, JPG, GIF (최대 10MB)</p>
          </div>
          <input
            type="file"
            name={name}
            accept={accept}
            required={required}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      {fileName && (
        <p className="mt-2 text-sm text-gray-600">
          선택된 파일: <span className="font-medium">{fileName}</span>
        </p>
      )}
    </div>
  );
}

