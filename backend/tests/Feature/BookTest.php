<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Arr;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_books()
    {
        $books = Book::factory(20)->create();
        $user = User::factory()->create(['role_id' => 1]);

        Sanctum::actingAs($user);
        $response = $this->get('/api/books');

        $response->assertStatus(200);
    }

    public function test_get_all_books_with_params()
    {
        $book = Book::factory()->create();
        $user = User::factory()->create(['role_id' => 1]);

        Sanctum::actingAs($user);
        $response = $this->get('/api/books?title=' . $book->title);

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [['id' => $book->id]]
        ]);
    }

    public function test_post_books()
    {
        $user = User::factory()->create(['role_id' => 1]);
        $data = [
            'title' => 'Name Example',
            'publisher' => 'Publisher Example',
            'writter' => 'Writter Example',
            'year' => 2011,
            'code' => "CE",
            'location' => "A.1",
        ];

        Sanctum::actingAs($user);
        $response = $this->post('/api/books', $data, [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('books', $data);
        $response->assertJson([
           'data' => $data 
        ]);
    }

    public function test_delete_book()
    {
        $book = Book::factory()->create();
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $response = $this->delete('/api/books/' . $book->id);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('books', ['id' => $book->id]);
    }

    public function test_put_book()
    {
        $book = Book::factory()->create();
        $user = User::factory()->create(['role_id' => 1]);

        Sanctum::actingAs($user);
        $response = $this->put('/api/books/' . $book->id, [
            'title' => 'Title Updated'
        ]);

        $response->assertStatus(200);
        $this->assertEquals($book->fresh()->title, 'Title Updated');
    }
}
