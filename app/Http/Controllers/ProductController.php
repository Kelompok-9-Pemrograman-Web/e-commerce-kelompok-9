<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['store', 'productImages', 'productCategory']);

        $categoryName = 'All Products';
        
        if ($request->has('category') && $request->category) {
            $slug = $request->category;
            $category = ProductCategory::where('slug', $slug)->first();
            
            if ($category) {
                $query->where('product_category_id', $category->id);
                $categoryName = $category->name;
            }
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categoryName' => $categoryName,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function show($slug)
    {
        $product = Product::with(['store', 'productImages', 'productCategory'])
            ->where('slug', $slug)
            ->firstOrFail(); 

        $relatedProducts = Product::with(['productImages', 'store'])
            ->where('product_category_id', $product->product_category_id)
            ->where('id', '!=', $product->id)
            ->inRandomOrder()
            ->take(4)
            ->get();

        return Inertia::render('Products/Detail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }
}