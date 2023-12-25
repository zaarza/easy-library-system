<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BookPutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'publisher' => 'required',
            'writter' => 'required',
            'year' => 'required|integer',
            'code' => 'nullable', Rule::unique('users', 'code')->ignore($this->get('code')),
            'location' => 'required',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        return response()->json([
            'message' => 'Invalid credentials.',
            'errors' => $validator->getMessageBag()
        ]);
    }
}
