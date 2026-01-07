<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request; // Tambahkan ini
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        // --- LOGIKA SEARCH & REDIRECT ---
        $search = $request->input('search');

        if ($search) {
            // Cari subject berdasarkan judul atau deskripsi
            $searchResults = Subject::where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->get();

            // JIKA DITEMUKAN TEPAT 1 HASIL -> LANGSUNG REDIRECT KE MATERI
            if ($searchResults->count() === 1) {
                return redirect()->route('subjects.show', $searchResults->first()->id);
            }
            
            // Jika hasil > 1 atau 0, kita biarkan kode lanjut ke bawah 
            // agar Dashboard tetap ter-render (user bisa melihat dropdown di frontend)
        }
        // --------------------------------

        // 6 subject untuk rekomendasi (tampilan card)
        $recommendedSubjects = Subject::latest()->take(6)->get();

        // SEMUA subject untuk SEARCH (Dropdown Client-side)
        $allSubjects = Subject::select('id', 'title', 'description')->get();

        // Subject yang sudah di-enroll user
        $enrolledSubjects = $user
            ? $user->enrollments()->with('subject')->get()->pluck('subject')
            : collect();

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'recommendedSubjects' => $recommendedSubjects,
            'allSubjects' => $allSubjects,
            'enrolledSubjects' => $enrolledSubjects,
            // Opsional: Kirim pesan jika search dilakukan tapi hasil > 1
            'flash' => [
                'message' => $search && $searchResults->count() > 1 ? 'Ditemukan beberapa hasil, silakan pilih dari daftar.' : null
            ] 
        ]);
    }
}