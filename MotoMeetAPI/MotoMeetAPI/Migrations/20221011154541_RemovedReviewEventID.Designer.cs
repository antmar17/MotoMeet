﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MotoMeetAPI.Models;

#nullable disable

namespace MotoMeetAPI.Migrations
{
    [DbContext(typeof(MotoMeetDbContext))]
    [Migration("20221011154541_RemovedReviewEventID")]
    partial class RemovedReviewEventID
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("EventUser", b =>
                {
                    b.Property<int>("Eventsid")
                        .HasColumnType("int");

                    b.Property<int>("Usersid")
                        .HasColumnType("int");

                    b.HasKey("Eventsid", "Usersid");

                    b.HasIndex("Usersid");

                    b.ToTable("EventUser");
                });

            modelBuilder.Entity("MotoMeetAPI.Models.Event", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("distance")
                        .HasColumnType("real");

                    b.Property<string>("meet_location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("meet_time")
                        .HasColumnType("datetime2");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("organizer_id")
                        .HasColumnType("int");

                    b.Property<string>("rules")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("MotoMeetAPI.Models.Review", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<int>("author_id")
                        .HasColumnType("int");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("rating")
                        .HasColumnType("int");

                    b.Property<int>("target_id")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("MotoMeetAPI.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<float?>("average_rating")
                        .HasColumnType("real");

                    b.Property<string>("bio")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EventUser", b =>
                {
                    b.HasOne("MotoMeetAPI.Models.Event", null)
                        .WithMany()
                        .HasForeignKey("Eventsid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MotoMeetAPI.Models.User", null)
                        .WithMany()
                        .HasForeignKey("Usersid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
