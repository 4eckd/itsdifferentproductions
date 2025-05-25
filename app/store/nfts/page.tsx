"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gem, ExternalLink, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { VocalistCTABanner } from "@/components/vocalist-cta-banner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

interface NFT {
  id: string;
  name: string;
  description: string;
  price: number;
  metadata: any;
  nft_data: {
    token_id: string | null;
    blockchain: string;
    contract_address: string | null;
    edition_size: number;
    edition_number: number;
    media_url: string;
    perks: string | null;
  };
}

export default function NFTsPage() {
  const { user } = useAuth();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockchainFilter, setBlockchainFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("none");

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          nft_data:nfts(*)
        `)
        .eq("category", "nft")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setNfts(data || []);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedNFTs = nfts
    .filter((nft) => {
      const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nft.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBlockchain = blockchainFilter === "all" ||
                               nft.nft_data?.blockchain === blockchainFilter;
      return matchesSearch && matchesBlockchain;
    })
    .sort((a, b) => {
      if (priceSort === "low-to-high") return a.price - b.price;
      if (priceSort === "high-to-low") return b.price - a.price;
      return 0;
    });

  const getMediaElement = (mediaUrl: string, name: string) => {
    const extension = mediaUrl.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return (
        <img
          src={mediaUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      );
    } else if (['mp4', 'webm', 'mov'].includes(extension || '')) {
      return (
        <video
          src={mediaUrl}
          className="w-full h-full object-cover"
          controls
          muted
        />
      );
    } else if (['mp3', 'wav', 'ogg'].includes(extension || '')) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-muted">
          <Gem className="h-16 w-16 mb-4 text-muted-foreground" />
          <audio src={mediaUrl} controls className="w-full max-w-[200px]" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-full bg-muted">
          <Gem className="h-16 w-16 text-muted-foreground" />
        </div>
      );
    }
  };

  const isAdmin = async () => {
    if (!user) return false;

    try {
      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      return data?.role === "admin";
    } catch {
      return false;
    }
  };

  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isAdmin();
      setUserIsAdmin(adminStatus);
    };

    if (user) {
      checkAdmin();
    }
  }, [user]);

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">NFT Collection</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Unique digital collectibles and exclusive content from Its Different Productions
            </p>
          </div>
          {userIsAdmin && (
            <Link href="/dashboard/nfts/upload">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create NFT
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="py-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search NFTs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={blockchainFilter} onValueChange={setBlockchainFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blockchains</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                  <SelectItem value="binance">Binance Smart Chain</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceSort} onValueChange={setPriceSort}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Sorting</SelectItem>
                  <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                  <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* NFT Grid */}
      <section className="py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg">Loading NFTs...</div>
          </div>
        ) : filteredAndSortedNFTs.length === 0 ? (
          <div className="text-center py-12">
            <Gem className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No NFTs Found</h3>
            <p className="text-muted-foreground mb-6">
              {nfts.length === 0
                ? "No NFTs have been created yet."
                : "No NFTs match your current filters."}
            </p>
            {userIsAdmin && nfts.length === 0 && (
              <Link href="/dashboard/nfts/upload">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First NFT
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedNFTs.map((nft) => (
              <BackgroundGradient key={nft.id} className="rounded-xl p-1">
                <div className="bg-background rounded-lg overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    {nft.nft_data?.media_url ? (
                      getMediaElement(nft.nft_data.media_url, nft.name)
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <Gem className="h-16 w-16" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{nft.name}</h3>
                      <Badge variant="outline" className="capitalize">
                        {nft.nft_data?.blockchain || "Unknown"}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {nft.description}
                    </p>

                    {nft.nft_data?.edition_size && nft.nft_data?.edition_number && (
                      <div className="text-xs text-muted-foreground mb-3">
                        Edition {nft.nft_data.edition_number} of {nft.nft_data.edition_size}
                      </div>
                    )}

                    {nft.nft_data?.perks && (
                      <div className="mb-4">
                        <Badge variant="secondary" className="text-xs">
                          Special Perks Included
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-bold text-lg">{nft.price} ETH</p>
                      </div>

                      <div className="flex gap-2">
                        {nft.nft_data?.contract_address && nft.nft_data?.token_id ? (
                          <Button size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View on Chain
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Gem className="h-4 w-4 mr-2" />
                            Purchase
                          </Button>
                        )}
                      </div>
                    </div>

                    {nft.nft_data?.token_id && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-xs text-muted-foreground">
                          Token ID: {nft.nft_data.token_id}
                        </div>
                        {nft.nft_data.contract_address && (
                          <div className="text-xs text-muted-foreground">
                            Contract: {nft.nft_data.contract_address.substring(0, 10)}...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </BackgroundGradient>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      {nfts.length > 0 && (
        <section className="py-8">
          <Card>
            <CardHeader>
              <CardTitle>Collection Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{nfts.length}</div>
                  <div className="text-sm text-muted-foreground">Total NFTs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {new Set(nfts.map(n => n.nft_data?.blockchain)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Blockchains</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {Math.min(...nfts.map(n => n.price)).toFixed(3)}
                  </div>
                  <div className="text-sm text-muted-foreground">Floor Price (ETH)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {nfts.reduce((sum, n) => sum + n.nft_data?.edition_size || 0, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Supply</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Vocalist Auditions Banner */}
      <VocalistCTABanner />
    </div>
  );
}
