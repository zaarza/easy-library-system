<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookPostRequest;
use App\Http\Requests\BookPutRequest;
use App\Models\Book;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    public function get(Request $request)
    {
        $data = DB::table('books')
                ->when($request->search, function ($query, string $search) {
                    $query->where('title', 'LIKE', '%' . $search . '%')
                    ->orWhere('writter', 'LIKE', '%' . $search . '%')
                    ->orWhere('publisher', 'LIKE', '%' . $search . '%')
                    ->orWhere('code', 'LIKE', '%' . $search . '%');
                });
        return response()->json($data->orderBy('title')->paginate(10));
    }

    public function post(BookPostRequest $request)
    {
        $data = $request->validated();
        if (!$data['code']) {
            $data['code'] = uniqid();
        }

        try {
            $book = Book::create($data);

            return response()->json([
                'message' => 'Data added.',
                'data' => $book,
            ], 201);
        } catch (Exception $exception) {
            return response()->json([
               'message' => 'Internal server error',
               'error' => $exception->getMessage(),
            ], 500);
        }
    }

    public function delete(Book $book)
    {
        if (!$book) {
            return response()->json([
                'message' => "Data not found."
            ], 404);
        }

        $book->delete();

        return response()->json([
            'message' => 'Data deleted.'
        ], 200);
    }

    public function put(Book $book, BookPutRequest $request)
    {
        $data = $request->validated();
        if (!$book) {
            return response()->json([
                'message' => 'Data not found.'
            ], 404);
        }

        try {
            $book->fill($data);
            $book->save();

            return response()->json([
                'message' => 'Data updated',
                'data' => $book->fresh(),
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'message' => 'Internal server error.',
                'error' => $exception->getMessage(),
            ], 500);
        }
    }
}
